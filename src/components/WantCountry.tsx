import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
  country:string;
}

interface ICountry {
  text: string;
  id: number;
}

const countryState = atom<ICountry[]>({
  key:"country",
  default: [],
});



function WantCountry() {

  const [ctrys, setCtrys] = useRecoilState(countryState)
  const {
        register, handleSubmit, formState: { errors }, setValue
  } = useForm<IForm>()
  const handleValid = ({ country }: IForm) => {
        setCtrys(oldCtrys => [{ text: country, id:Date.now() }, ...oldCtrys])
        setValue("country", "");
  };
  // console.log(ctrys)
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)} style={{display: "flex", flexDirection: "column"}}>
        <input {...register("country", {
            required: "😤 required!",
        })} placeholder="이름" />
        <span style={{ color: 'red' }}>
          {errors?.country?.message as string}
        </span>
        <button>가자!</button>
      </form>
      <ul>
        {ctrys.map(country => <li key={country.id}>{country.text}</li>)}
      </ul>
    </div>
  );
}

export default WantCountry;