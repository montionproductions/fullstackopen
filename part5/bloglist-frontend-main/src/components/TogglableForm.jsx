import React, { useState } from 'react'

const TogglableForm = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleFormSubmit = (event) => {
    props.onFormSubmit(event);
    setVisible(false);
  };

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { inputHandle: handleFormSubmit });
    }
    return child;
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {childrenWithProps}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default TogglableForm