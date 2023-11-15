import { useContext, useEffect, useReducer, useState } from "react";
import { RootContext } from "../../context/RootContext";
import { callUsersApi } from "../../service/Service";
import styles from "./style.module.css"

const UserList = () => {
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
  const { gender } =useContext(RootContext);
  const maleUsers = users?.filter((user) => {
    return user.gender === "male";
  });
  const femaleUsers = users?.filter((user) => {
    return user.gender === "female";
  });


  useEffect(() => {
    const callUsers = () => {
      dispatch({ type: "UPDATE" });
    };
    callUsers();
  }, []);

  return (
    <div className={styles.main}>
      
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
