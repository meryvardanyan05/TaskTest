import React, { useState } from "react";
import UUID from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core';
import "./App.css";
import AddCardList from "./components/AddCardList";
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import Card from  '@material-ui/core/Card'

const styles = makeStyles(theme => ({
  app: {
    display: 'flex',
  },
  wrapper: {
    padding: 15,
  },
  listbtn: {
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
  }
})
);
function App() {
  let [inputValue, setInputvalue] = useState('')
  let [list, setList] = useState([])
  let [openList, setOpenList] = React.useState(true);
  const classes = styles()

  const openListbtn = () => {
    setOpenList(!openList)
  }
  const handleAddItem = () => {
    const generatedId = UUID.v4();
    if (inputValue.trim()) {
      setList(
        list = [...list, { id: generatedId, name: inputValue, checked: false }],
      );
    }
    setInputvalue(inputValue = "")
  };
  
  const handleInputChange = event => {
    setInputvalue(inputValue = event.target.value)
  };

  const renderItem = (item) => {
    return (
      <AddCardList item={item}  key={item.id}/>
    );
  };

  return (
    <div className={classes.app}>
      {list.map(item => renderItem(item))}
      {openList ? (<div className={classes.listbtn} onClick={openListbtn} style={{ fontSize: '20px',color:"white" , width:'200px' }}>
        <AddIcon color="secondary" style={{ color: 'white',fontSize: '20px' }} fontSize='large'  />
                    Add another List
      </div>) :
        (<><Card style={{height:'95px',margin:5}}>
          <div style={{ display: "flex", flexDirection: 'column' , width:'200px',backgroundColor:'#ebecf0'}}>
            <TextField
              id="outlined-dense"
              placeholder='Write list title'
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div>
              <Button style={{ textTransform: 'capitalize' }}
                variant="contained"
                color="primary"
                onClick={handleAddItem}
              >
                Add List
          </Button>
              <ClearIcon onClick={openListbtn} />
            </div>
          </div>
          </Card>
        </>
        )
      }
    </div>

  );
}
export default App;
