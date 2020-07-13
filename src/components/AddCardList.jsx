import React, { useState, useEffect } from "react";
import UUID from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core';
import AddCard from "./AddCard/AddCard";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const styles = makeStyles(theme => ({
  app: {
    display: 'inline-block',
    margin: 5
  },
  Addbtn: {
    overFlow: 'hidden',
    padding: '6px 8px 2px',
    position: 'relative',
    zIndex: '10',
    color: '#5e6c84',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '8px',
    maxWidth: '300px',
    minHeight: '20px',
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0,
  },
  root: {
    maxWidth: 300,
    backgroundColor: '#ebecf0',
    minWidth: 300,
  },

})
);
function AddCardList(props) {
  let [inputValue, setInputvalue] = useState('')
  let [addCard, setAddCard] = useState([])
  const [expanded, setExpanded] = React.useState(true);
  let cardTitle = useState(props.item.name)
  const classes = styles()


  const onDragEnd = result => {
    const { destination, source, reason } = result;
    if (!destination || reason === 'CANCEL') {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const addCard1 = Object.assign([], addCard);
    const droppedUser = addCard[source.index];

    addCard1.splice(source.index, 1);
    addCard1.splice(destination.index, 0, droppedUser);
    setAddCard(
      addCard1
    );
  }
  const AddCardb = () => {
    setExpanded(!expanded);
  };
  const handleAddItem = () => {
    const generatedId = UUID.v4();
    if (inputValue.trim()) {
      setAddCard(
        addCard = [...addCard, { id: generatedId, name: inputValue }],
      );
    }
    setInputvalue(inputValue = "")
  };

  const handleInputChange = event => {
    setInputvalue(inputValue = event.target.value)
  };

  useEffect(() => {
    window.addEventListener('keydown', (handleUserKeyPress));
  });

  const handleUserKeyPress = (event) => {
    const { keyCode } = event;
    switch (keyCode) {

      case 13: {
        handleAddItem()
        break;
      }
      default: {
        break;
      }
    }
  };
  let CardInputProps = {
    onKeyPress: handleUserKeyPress
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.app}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <div>
                <h3 style={{ fontWeight: 600, margin: '0 0 8px', color: '#172b4d' }}>
                  {cardTitle}
                </h3>
              </div>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <div>
            <Droppable droppableId="dp1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {addCard.map((item, index) => <AddCard
                    key={item.id}
                    item={item}
                    index={index}
                  />)}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <CardActions >
            {expanded ? (
              <div className={classes.Addbtn} onClick={AddCardb} style={{ fontSize: '20px' }}>
                <AddIcon color="secondary" style={{ color: 'grey', fontSize: '20px' }} fontSize='large' />
                    Add another card
              </div>
            ) : (
                <div style={{ display: "flex", flexDirection: 'column', }}>
                  <TextField id="outlined-basic"
                    placeholder='Enter a title for this card...'
                    variant="outlined"
                    value={inputValue}
                    onChange={handleInputChange}
                    InputProps={CardInputProps.onKeyPress} />
                  <div>
                    <Button onClick={handleAddItem} variant="contained"
                      color="primary"
                      style={{ textTransform: 'capitalize' }}>
                      Add Card
                  </Button>
                    <ClearIcon onClick={AddCardb} />
                  </div>
                </div>
              )
            }
          </CardActions>
        </Card>
      </div>
    </DragDropContext>
  );
}
export default AddCardList;