import "./App.css";
import { useEffect, useState, useContext } from "react";
import CartCtx from "./CartContext";

function App() {
  const ctx = useContext(CartCtx);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [updatedItem, setUpdatedItem] = useState();

  const fetchData = async function () {
    let val = await fetch(
      "https://random-data-api.com/api/users/random_user?size=40"
    );
    let res = await val.json();
    setUsers(res);
  };

  const addToCart = function (id) {
    let user = users.find((user) => {
      return user.id === id;
    });
    ctx.addItemToCart(user);
  };

  const deleteItemFromCart = function (id) {
    ctx.removeItemFromCart(id);
  };

  const updateItem = function (id) {
    let val = users.find((user) => {
      return user.id === id;
    });
    setUpdatedItem(val.first_name);
  };

  const updateItemArr = function () {
    console.log()
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <div>IndiaMart</div>
      <div>
        <input
          type="text"
          placeholder="update item.."
          value={updatedItem}
          onChange={(e) => {
            setUpdatedItem(e.target.value);
          }}
        />
        <button onClick={updateItemArr}>Update</button>
        <input
          placeholder="search users"
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {users
          ?.filter((user) => {
            return user.first_name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          })
          .map((user) => {
            return (
              <div
                key={user.id}
                style={{
                  border: "1px solid black",
                  width: "200px",
                  margin: "10px",
                  height: "100px",
                  position: "relative",
                }}
              >
                {user.first_name} {user.last_name}
                <div>{user.email}</div>
                <div style={{ position: "absolute", bottom: 0 }}>
                  <button
                    onClick={() => {
                      addToCart(user.id);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      updateItem(user.id);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={{ border: "1px solid black", height: "100px", width: "100%" }}
      >
        {ctx.items?.map((item) => {
          return (
            <div>
              {item.first_name}
              <button
                onClick={() => {
                  deleteItemFromCart(item.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
