function Title(props) {
  return (
    <h1 className="text-3xl font-bold text-center my-4">
      {props.children || "Gerenciador de Tarefas"}
    </h1>
  );
}

export default Title;
