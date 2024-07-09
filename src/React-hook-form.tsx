import { error } from "console";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

/*
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}
  */

interface IForm {
    email: string;
    firstName: string;
    lastName?: string;
    username: string;
    password: string;
    password1: string;
    extraError?:string;
}

function ToDoList() {
    const { register, watch, handleSubmit, formState:{errors}, setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });

    const onValid = (data:IForm) => {
        //console.log(data);
        if(data.password !== data.password1) {
            setError("password1", { message:"Password are not the same" })
        }
        setError("extraError", { message: "Server offline." }, { shouldFocus: true });
    };
    // console.log(watch());
    console.log(errors)

    return (
        <div>
            <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", { 
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "Only naver.com emails allowed",
                    }, 
                    })} placeholder="Email" 
                />
                <span>
                    {errors.email?.message as string}
                </span>

                <input {...register("firstName", { 
                    required: true,
                    validate: {
                        noNico: (value) => value.includes("nico") ? "no nicos allowed" : true,
                        noNick: (value) => value.includes("nick") ? "no nick allowed" : true,
                    }
                
                    })} placeholder="First Name" />
                <span>
                    {errors.firstName?.message as string}
                </span>

                <input {...register("lastName", { required: true })} placeholder="Last Name" />
                <span>
                    {errors.lastName?.message as string}
                </span>

                <input {...register("username", { required: true, minLength: 10 })} placeholder="Username" />
                <span>
                    {errors.username?.message as string}
                </span>

                <input {...register("password", { required: true, minLength: 5 })} placeholder="Password" />
                <span>
                    {errors.password?.message as string}
                </span>

                <input {...register("password1", { required: "Password is required", minLength: {
                    value: 5,
                    message: "Your password is too short"
                } })} placeholder="Password1" />
                <span>
                    {errors.password1?.message as string}
                </span>

                <button>Add</button>
                <span>
                    {errors.extraError?.message as string}
                </span>
            </form>
        </div>
    );
}

export default ToDoList;