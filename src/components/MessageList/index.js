// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { debounce, groupBy } from 'lodash';
import moment from 'moment';

import Message from '../Message';

const styles = StyleSheet.create({
  container: {
    background: '#fff',
    flex: '1',
    padding: '10px 10px 0 10px',
    overflowY: 'auto',
    width: '100%'
  },
  dayDivider: {
    margin: '1rem 0',
    position: 'relative',
    textAlign: 'center',
    '::after': {
      background: 'rgb(240, 240, 240)',
      content: '""',
      height: '1px',
      left: '0',
      position: 'absolute',
      right: '0',
      top: '50%'
    }
  },
  dayText: {
    background: '#fff',
    padding: '0 12px',
    position: 'relative',
    zIndex: '1'
  }
});

type MessageType = {
  day: string;
  id: number,
  inserted_at: string
};
type Props = {
  loadingOlderMessages: boolean,
  messages: Array<MessageType>,
  moreMessages: Array<MessageType>,
  onLoadMore: () => void
};

class MessageList extends Component {
  container: any;
  props: Props;

  handleScroll = () => {
    if (this.props.moreMessages && this.container.scrollTop < 20) {
      this.props.onLoadMore();
    }
  };
  maybeScrollToBottom = () => {
    if (this.container.scrollHeight - this.container.scrollTop < this.container.clientHeight + 50) {
      this.scrollToBottom();
    }
  };
  renderMessages = (messages: Array<MessageType>) => messages.map((message) =>
    <Message key={ message.id } message={ message } />
  );
  scrollToBottom = () => setTimeout(() => {
    this.container.scrollTop = this.container.scrollHeight;
  });

  constructor(props: Props) {
    super(props);
    this.handleScroll = debounce(this.handleScroll, 200);
  }

  componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.messages.length !== this.props.length) {
      this.maybeScrollToBottom();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.handleScroll);
  }

  renderDays() {
    const { messages } = this.props;

    messages.forEach((message) => message.day = moment(message.inserted_at).format('MMMM Do'));

    const dayGroups = groupBy(messages, 'day');
    const days = Object.keys(dayGroups).map((date) => ({ date, messages: dayGroups[date] }));
    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');

    return days.map((day) =>
      <div key={ day.date }>
        <div className={ css(styles.dayDivider) }>
          <span className={ css(styles.dayText) }>
            { day.date === today && 'Today' }
            { day.date === yesterday && 'Yesterday' }
            { ![today, yesterday].includes(day.date) && day.date }
          </span>
        </div>

        { this.renderMessages(day.messages) }
      </div>
    );
  }

  render() {
    return (
      <div className={ css(styles.container) } ref={ (c) => { this.container = c; } }>
        { this.props.moreMessages &&
        <div style={ { textAlign: 'center' } }>
          <button className="btn btn-link btn-sm"
            disabled={ this.props.loadingOlderMessages }
            onClick={ this.props.onLoadMore }>
            { this.props.loadingOlderMessages ? 'Loading' : 'Load More' }
          </button>
        </div>
        }
        { this.renderDays() }
      </div>
    )
  }
}

export default MessageList;
