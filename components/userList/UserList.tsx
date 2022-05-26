import axios from "axios";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RootContext } from "../../context/RootContext";
import { callUsersApi } from "../../service/Service";
import styles from "./style.module.css"

const UserList = () => {
  const [dropList, setDropList] = useState(false);
  const [users, setUser] = useState([]);
  //Reducer 
  const reducer = (state: any, action: { type: any; }) => {
    switch (action.type) {
      case "UPDATE":
        const usersApi = async () => {
          try {
            const response = await callUsersApi();
            if(response.status===200){
                setUser(response.data.results);
            }else{
                console.log(response.status)
            }
          } catch (e) {
            console.log(e);
          }
        };
        return usersApi();
      default:
        return state;
    }
  };
  const [list, dispatch] = useReducer(reducer, users);
  const { nation, setNation, gender } =useContext(RootContext);
  console.log(users)
  const maleUsers = users?.filter((user) => {
    return user.gender === "male";
  });
  const femaleUsers = users?.filter((user) => {
    return user.gender === "female";
  });
  let nations = [];
  const usernations = users?.filter((user)=>{
    nations.includes(user.nat)? null : nations.push(user.nat);
    return nations;
  })
  const handleDrop = (user: any) => {
    setNation(user);
    setDropList(false);
  };

  useEffect(() => {
    const callUsers = () => {
      dispatch({ type: "UPDATE" });
    };
    callUsers();
  }, []);

  return (
    <div className={styles.main}>
        <h1 className={styles.select}>Select Nationality:</h1>
        <div className={styles.dropdown}>
          <span className={styles.nat}>{nation}</span>
          <RiArrowDropDownLine
            className={styles.arrow}
            onClick={() => setDropList(!dropList)}
          />
          {dropList === true
            ? nations?.map((user) => {
                return (
                  <div className={styles.list} onClick={() => handleDrop(user)}>
                    {user}{" "}
                  </div>
                );
              })
            : null}
        </div>
        {gender === "All" ? (
          <div>
            {users?.map((user) => {
              return (
                <div className={styles.userBg}>
                  <img className={styles.img} src={user.picture.medium} />
                  <span className={styles.name}>
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className={styles.email}>{user.email}</span>
                </div>
              );
            })}
          </div>
        ) : gender === "Male" ? (
          <div>
            {maleUsers?.map((user) => {
              return (
                <div className={styles.userBg}>
                  <img className={styles.img} src={user.picture.medium} />
                  <span className={styles.name}>
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className={styles.email}>{user.email}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {femaleUsers?.map((user) => {
              return (
                <div className={styles.userBg}>
                  <img className={styles.img} src={user.picture.medium} />
                  <span className={styles.name}>
                    {user.name.title} {user.name.first} {user.name.last} (
                    {user.nat})
                  </span>
                  <span className={styles.email}>{user.email}</span>
                </div>
              );
            })}
          </div>
        )}
    </div>
        
  );
}
export default UserList;
