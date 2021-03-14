import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';


function App() {

  const [name, setName] = useState("");
  const [complete, setComplete] = useState(false);

  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const doneList = (name) => {
    dispatch({ type: "DONE_LIST", payload: name }) //reducerにactionの実行を伝える
  };

  const deleteList = (name) => {
    dispatch({ type: "DELETE_LIST", payload: name })
  };

  const inputText = (e) => {
    setName(e.target.value);
  }

  const addList = () => {
    if (!name) {
      return; //文字が入っていなかったらdispatchを行わない
    }

    setComplete(false);

    dispatch({
      type: "ADD_LIST",
      payload: {
        name,
        complete
      }
    })

    setName("");
  }

  return (
    <div className="App">
      <h1>ReduxでTodoリスト作成</h1>
      <input
        type="text"
        value={name}
        onChange={inputText}
      />
      <button onClick={addList}>追加</button>

      <h2>【未完了のタスク】</h2>
      <ul className="unComplete">
        {lists
          .filter((list) => list.complete === false)
          .map((list, index) => (
            <div key={index}>
              {list.name}
              <button onClick={() => doneList(list.name)}>完了</button>
              <button onClick={() => deleteList(list.name)}>削除</button>
            </div>
          ))
        }
      </ul>

      <h2>【完了済みのタスク】</h2>
      <ul className="complete">
        {lists
          .filter((list) => list.complete === true)
          .map((list, index) => (
            <div key={index}>{list.name}</div>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
