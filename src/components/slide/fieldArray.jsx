import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";


let renderCount = 0;

export const ArrayDelete = () => {
  const [data, setData] = useState([]);
  const { register, getValues, watch, handleSubmit, control } = useForm();
  const at = watch("at", 2);
  const prepend = () => {
    setData([{ id: renderCount  }, ...data]);
  };

  const append = () => {
    setData([...data, { id: renderCount }]);
  };

  const remove = index => {
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  const update = index => {
    const data = getValues();
    data[index].id = data[`field${index}`];
    setData([...data]);
  };

  const insert = index => {
    setData([
      ...data.slice(0, index),
      { result: "", id: renderCount },
      ...data.slice(index)
    ]);
  };

  const onSubmit = data => console.log(data);

  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {data && data.map((item, index) => (
          <li key={item.id}>
            <Controller
              as={<input />}
              name={`field${item.id}`}
              control={control}
              defaultValue={item.id}
            />
            <button onClick={() => remove(index)}>Delete</button>
            <button onClick={() => update(index)}>Edit</button>
          </li>
        ))}
      </ul>
      <section>
        
        
      </section>

      <input type="submit" />
    </form>
  );
}

