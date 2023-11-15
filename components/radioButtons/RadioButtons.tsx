import { useContext } from "react";
import { RootContext } from "../../context/RootContext";
import styles from "./style.module.css"

const RadioButtons = () => {  
  const {gender, setGender} = useContext(RootContext)
  const isSelected = (val:string) => gender === val;
  const handleClick = (e:any) :any => setGender(e.currentTarget.value);
  return (
    <div className={styles.main}>
      <dl>
          <input
            type="radio"
            value="Male"
            checked={isSelected("Male")}
            onChange={handleClick}
          />
          <span>Male</span>
        </dl>
        <dl>
          <input
            type="radio"
            value="Female"
            checked={isSelected("Female")}
            onChange={handleClick}
          />
          <span>Female</span>
        </dl>
        <dl>
          <input
            type="radio"
            value="All"
            checked={isSelected("All")}
            onChange={handleClick}
          />
          <span>All</span>
        </dl>
    </div>
  );
}
export default RadioButtons;
