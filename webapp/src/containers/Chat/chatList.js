import React, {useEffect, useState} from 'react';
import Message from '../Message';
export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    props.mensajes();
  },[])

  
  const getMessages = () => {
     var tempMessages = [
        //SACAR MENSAJES DE MONGODB esto es de prueba

        {
            id: 1,
            author: 'apple',
            message: 'Esto es una pruebaaaa del chat para RADARIN 6A',
            timestamp: new Date().getTime()
          },
          {
            id: 2,
            author: 'orange',
            message: 'Holaaa!',
            timestamp: new Date().getTime()
          },
      ]
      setMessages([...messages, ...tempMessages])
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author ==="apple";//=== MY_USER_ID;//OJO HAY QUE PONER EL WEB ID DEL USER
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return(
    <div className="message-list">
    

      <div className="message-list-container">{renderMessages()}</div>
      </div>);

}