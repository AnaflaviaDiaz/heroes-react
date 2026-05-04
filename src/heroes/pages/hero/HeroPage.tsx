import { useParams } from "react-router";

export const HeroPage = () => {
  // para obtener los parámetros que vienen en la url
  const params = useParams();

  console.log(params)
  
  return (
    <div>HeroPage</div>
  )
}
