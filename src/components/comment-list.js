import React, { Component } from 'react'
import PropTypes from 'prop-types';


import Comment from './comment'
import toggleOpen from '../decorators/toggleOpen'

import CSSTransition from 'react-addons-css-transition-group'


class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired,

        // from decorator
        isOpen: PropTypes.bool,
        toggleOpenItem: PropTypes.func.isRequired
    }

    render() {
        const { isOpen, toggleOpenItem } = this.props
        return (
            <div>
                <button onClick={toggleOpenItem}>
                    {isOpen ? 'hide comments' : 'show comments'}
                </button>
                {isOpen ? this.getBody() : null}
              <CSSTransition
                transitionName="article"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={3000}
              >
                {isOpen ? this.getBody() : null}
              </CSSTransition>
            </div>
        )
    }

    getBody() {
        const { comments } = this.props
        const body = comments.length ? (
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        ) : (
            <h3>No comments yet</h3>
        )
        return <div>{body}</div>
    }
}

export default toggleOpen(CommentList)
