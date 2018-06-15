import React, { Component } from 'react'
import { connect } from 'react-redux'
import { last, head, mapObjIndexed, pick } from 'ramda'
import { interval } from 'rxjs/observable/interval'
import { map, take, takeUntil, throttleTime, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { addEntity, connectTwoEntities } from 'actions/entities'
import BackgroundGrid from 'components/backgroundGrid'
import CircularArea from 'components/circularArea'
import ControlPanel from 'components/controlPanel'
import { getTLHW, snapToGridFactory } from './helpers'
import './styles.scss'
import CircleDrawArea from 'components/circleDrawArea'
import ConnectDrawArea from 'components/connectDrawArea'

const initialState = {
  startCoords: [-1, -1],
  currentCoords: [-1, -1]
}

const mapStateToProps = state => {
  const { entities: { entities, adjacency }, settings: { gridSize }, selection } = state
  return { entities, gridSize, selection }
}

class Workspace extends Component {
  state = initialState

  componentWillMount() {
    // the function that snaps user-drawn rectangles to the grid
    this._snapToGrid = snapToGridFactory(this.props.gridSize)
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseMove$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))
    this._mouseDown$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))

    this._mouseDown$.subscribe(({pageX, pageY}) => this.setState(mapObjIndexed(() => [pageX, pageY], initialState)))
    this._mouseUp$.subscribe(() => this.setState({ startCoords: [-1, -1] }))

    // update the dragged rectangle every 60ms
    this._updateCurrentCoords$ = interval(60).pipe(withLatestFrom(this._mouseMove$), map(last))
    this._updateCurrentCoords$.subscribe(({pageX, pageY}) => this.state.startCoords[0] !== -1 && this.setState({ currentCoords: [pageX, pageY] }))

    this._shapeDrawn$ = this._mouseUp$.pipe(withLatestFrom(this._updateCurrentCoords$))
    this._shapeDrawn$.subscribe(
      ([{pageX: x1, pageY: y1}, {pageX: x2, pageY: y2}]) => {
        const { left: x, top: y, height, width } = this._snapToGrid([x2, y2])

        if (height !== 0 || width !== 0) {
          this.props.addEntity({x, y, height, width})
        }

        this.setState(initialState)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gridSize !== nextProps.gridSize) {
      this._snapToGrid = snapToGridFactory(nextProps.gridSize)
    }
  }

  _mouseDown = event => this._mouseDown$.next(event)
  _mouseUp = event => this._mouseUp$.next(event)
  _mouseMove = event => this._mouseMove$.next(event)


  render() {
    const {
      props: { entities, gridSize, selection },
      state: { currentCoords }
    } = this

    console.log(selection)

    return (
      <div className='workspaceWrapper'>
        <BackgroundGrid />
        <ControlPanel />
        { selection.length > 0 ? <ConnectDrawArea /> : <CircleDrawArea /> }
      </div>
    )
  }
}

export default connect(mapStateToProps, {addEntity, connectTwoEntities})(Workspace)