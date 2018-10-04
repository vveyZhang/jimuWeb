import  { Component } from 'react';
import CommentsInput from './CommentsInput'
import styles from './index.less'
class Comments extends Component {

    state = {
        inputVisiable: false
    }
    onInput = (content) => {
        this.props.handleComment(content, this.props.userid);
        this.setState({
            inputVisiable: false
        })
    }
    render() {
        return (<div className={styles.comments} >
            <div className={styles.commentsUser} >
                <img alt="" src={this.props.pic} />
            </div>
            <div className={styles.commentsContent} >
                <div className={styles.userName} >
                    <span className={styles.name}>{this.props.name}</span>
                    {this.props.reply_userid ? <span className={styles.reply}>回复</span> : null}
                    <span className={styles.name}>{this.props.replyName}</span>
                    <span className={styles.time}>( {this.props.updated_at} )</span>
                </div>
                <div className={styles.commentsText} >
                    {this.props.content}
                </div>
                <div className={styles.tools} >
                    <span className={styles.reply} onClick={() => this.setState({
                        inputVisiable: !this.state.inputVisiable
                    })} >回复</span>
                </div>
                {
                    this.state.inputVisiable ? <CommentsInput onInput={this.onInput} login={this.props.login} btnTxt='回复' /> : null
                }

            </div>
        </div>)
    }
}
export default Comments