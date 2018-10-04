import  { Component } from 'react'
import styles from './index.less'
export default class Loading extends Component {
    static defaultProps = {
        loading: false
    }
    render() {
        const { loading } = this.props;
        return (
            loading ? (<div className={styles.loadingContainer} >
                <div className={styles.loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>) : null
        )
    }
}
