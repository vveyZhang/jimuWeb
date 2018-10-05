import  { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"
import styles from './index.less'
export default class CommentsInput extends Component {
    static propTypes = {
        btnTxt: PropTypes.string,
        login: PropTypes.bool
    }
    static defaultProps = {
        btnTxt: '评论',
        login: false
    }
    state = {
        comments: '',
        isClick: false
    }
    handlerInput = (e) => {
        const value = e.target.value;
        this.setState({
            comments: value,
            isClick: !value == ""
        })
    }
    handlerComment = () => {
        const { isClick, comments } = this.state;
        if (!isClick) return;
        this.props.onInput(comments)
    }
    render() {
        const { comments, isClick } = this.state;
        const { btnTxt, login } = this.props;
        return (
            <div className={styles.commentsInputWarp} >
                {
                    login ? <textarea placeholder="请输入..." className={styles.input} value={comments} onChange={this.handlerInput} /> :
                        <div className={styles.loginTips} >
                            未登录，请先登录
                    </div>
                }

                <div onClick={this.handlerComment} className={classNames(styles.btn, (!isClick || !login) && styles.disabled)} >{btnTxt}</div>
            </div>
        )
    }
}
