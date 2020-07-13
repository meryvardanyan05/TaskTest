import React, { useState } from "react";
import CustomizedDialogs from '../Modal'
import { makeStyles } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Draggable } from 'react-beautiful-dnd';

const styles = makeStyles(theme => ({
  root: {
    overFlow: 'hidden',
    padding: '6px 8px 2px',
    position: 'relative',
    zIndex: '10',
    backgroundColor: '#fff',
    borderRadius: '3px',
    boxShadow: '0 1px 0 rgba(9,30,66,.25)',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '8px',
    maxWidth: '300px',
    minHeight: '20px',
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0,
  },
})
);
function AddCard(props) {
  let [showModal, setShowModal] = useState(false)
  let [name, setName] = useState(props.item.name)
  let [descValue, setDescValue] = useState('')
  let [commList, setCommList] = useState([])

  const onSave = (initials) => {
    setName(name = initials)
  }

  const handleEdit = () => {
    setShowModal(!showModal);
  };
  const handleAddCommentList = (value) => {
    setCommList(commList = [...commList, value])
  };

  const handleAddDescription = (initialValue) => {
    setDescValue(descValue = initialValue)
  };

  const classes = styles()

  return (
    <Draggable
      key={props.index}
      draggableId={props.index + ' '}
      index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={classes.root}>
            <div onClick={handleEdit} >
              <div>
                {name}
              </div>
              <div style={{ display: 'flex', flex: 'overflow', marginTop: '15px' }} >
                {descValue && <span>
                  <DescriptionIcon onClick={handleEdit} /></span>}

                {!!commList.length &&
                  <span style={{ display: 'flex', flex: 'overflow', marginLeft: '10px' }} >
                    < ChatBubbleOutlineIcon />
                    {commList.length}
                  </span>
                }
              </div>
            </div>
            {showModal &&
              <CustomizedDialogs isopen={handleEdit} name={name} onSave={onSave}
                onDescSave={handleAddDescription}
                descValue={descValue}
                onCommSave={handleAddCommentList}
                commList={commList} />
            }
          </div>
        </div>
      )}
    </Draggable>
  );
}
export default AddCard;
