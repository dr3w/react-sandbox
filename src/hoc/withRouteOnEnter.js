import { compose, lifecycle } from 'recompose'

const withRouteOnEnter = (callback) => {
  const onRouteEnterCallback = (props) => {
    if (callback && typeof callback === 'function') {
      callback(props)
    }
  }

  return compose(
    lifecycle({
      componentWillMount() {
        onRouteEnterCallback(this.props, {})
      },
      componentWillReceiveProps(nextProps) {
        const prevProps = this.props

        if (nextProps.location.key !== prevProps.location.key) {
          onRouteEnterCallback(nextProps, prevProps)
        }
      }
    })
  )
}

export default withRouteOnEnter
