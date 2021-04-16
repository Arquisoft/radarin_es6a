import styled from "styled-components";


/*
    export const ChatInputContainer = styled.inputContainer`
  
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      marginLeft: theme.spacing(1),
      position: 'relative',
      width: '100%',
    `;

    export const ChatIconStyle = styled.icon`
    
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  `;
  export const ChatInputInput = styled.inputInput`
      padding: theme.spacing(1, 1, 1, 7),
      width: '100%',
    `;
    */
    export const ChatWrapper = styled.section`
    display: flex;
    flex: 1 0 auto;
    flex-direction: row;
    #save_route{
      margin-left:110px;
    }
    @media only screen and (max-width: 900px) {
      padding: auto;
      
      display: flex;
      align:center;
      flex-direction: column;
      max-width: 100%;
      height: 20px;
      h5,
      h6,
      p,
      ul li {
        color: white;
        text-align: center;
        margin: auto;
        font-family: 'Work Sans', sans-serif;
        font-size: 12px;
      }
  
      input {
        max-width: 100%;
      }	
  `;
  
  export const Header = styled.div`
    max-width: 100%;
    align-items: top;
    justify-content: center;
    background: rgb(0, 77, 134);
    background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
    padding: 30px 20px;
    p {
      color: white;
    }
  `;

  export const MessageChat= styled.div`
  .message {
    display: flex;
    flex-direction: column;
  }
  
  .message .timestamp {
    display: flex;
    justify-content: center;
    color: #999;
    font-weight: 600;
    font-size: 12px;
    margin: 10px 0px;
    text-transform: uppercase;
  }
  
  .message .bubble-container {
    font-size: 14px;
    display: flex;
  }
  
  .message.mine .bubble-container {
    justify-content: flex-end;
  }
  
  .message.start .bubble-container .bubble {
    /* margin-top: 10px; */
    border-top-left-radius: 20px;
  }
  
  .message.end .bubble-container .bubble {
    border-bottom-left-radius: 20px;
    /* margin-bottom: 10px; */
  }
  
  .message.mine.start .bubble-container .bubble {
    margin-top: 10px;
    border-top-right-radius: 20px;
  }
  
  .message.mine.end .bubble-container .bubble {
    border-bottom-right-radius: 20px;
    margin-bottom: 10px;
  }
  
  .message .bubble-container .bubble {
    margin: 1px 0px;
    background: #f4f4f8;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 75%;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  .message.mine .bubble-container .bubble {
    background: #007aff;
    color: white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  `;
  
 
  
  export const Button = styled.button`
    max-width: 128px;
    display: inline-block;
  
    &:first-child {
      margin-right: 10px;
    }
  `;
  
  
  
  export const DivForms = styled.div`
  margin: 1em;@media only screen and (max-width: 900px) {
      align-text:center;		
      max-width: 100%;
      h5,
      h6,
      p,
      ul li {
        color: white;
        text-align: center;
        margin: auto;
        font-family: 'Work Sans', sans-serif;
        font-size: 12px;
      }
      input {
        margin:auto;
        max-width: 100%;
      }`;
  
  export const InputSubmit = styled.input`float: right;`;
  
  export const LabelInput = styled.label`
    color: white;
    @media only screen and (max-width: 900px) {
      width: 100%;
    }
  `;
  
  export const TitleChat = styled.h1`
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
    margin: 0;
  }
  `;
  
  
  

  
  export const InputFile = styled.input``;
  
  export const DivDivisor = styled.div`padding: 30px 20px;@media only screen and (max-width: 900px) {
      align-text:center;		
      max-width: 100%;
      h5,
      h6,
      p,
      ul li {
        color: white;
        text-align: center;
        margin: auto;
        font-family: 'Work Sans', sans-serif;
        font-size: 12px;
      }
      input {
        margin:auto;
        max-width: 100%;
      }`;
  
  export const ChatForm = styled.form`max-width: 100%;
  @media only screen and (max-width: 900px) {
      align-text:center;		
      max-width: 100%;
      h5,
      h6,
      p,
      ul li {
        color: white;
        text-align: center;
        margin: auto;
        font-family: 'Work Sans', sans-serif;
        font-size: 12px;
      }
      input {
        margin:auto;
        max-width: 100%;
      }`;
  
  

  
    