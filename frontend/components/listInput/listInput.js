export default function ListInput(props) {
const changeArrayItem = (data)=>{
    let tempArray = [...props.value];
    if(props.preparation == true){
        tempArray[data.target.name] = {position: Number(data.target.name) + 1,instruction: data.target.value};
    }
    else{
        tempArray[data.target.name] = data.target.value;
    }
    props.changeRecipeInput({target: {name: props.target, value: tempArray}});
}

const deleteOneItem = (index)=>{
    let tempArray = [...props.value];
    tempArray.splice(index, 1);
    if(props.preparation == true){
        tempArray.map((item,index)=>{
            tempArray[index].position = index + 1;
        });
    }
    props.changeRecipeInput({target: {name: props.target, value: tempArray}});
}

const addNewItem = ()=>{
    let tempArray = [...props.value];
    if(props.preparation == true){
        const tempLength = tempArray.length;
        tempArray.push({position: tempLength + 1,instruction: ""});
    }
    else{
        tempArray.push("");
    }
    props.changeRecipeInput({target: {name: props.target, value: tempArray}});
}

  return (
    <>
      {props.value?.length > 0 ? (
        props.value.map((item, index) => {
          return (
            <div className="listInputItem" key={index}>
              <input
                className="textInput"
                id={index}
                name={index}
                onChange={changeArrayItem}
                value={props.preparation ? item.instruction : item}
              />
              <div className="listInputDeleteButton" onClick={()=> deleteOneItem(index)}>x</div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="listInputAddItemButton" onClick={addNewItem}>Adicionar novo item</div>
    </>
  );
}
