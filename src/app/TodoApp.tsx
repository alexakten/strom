import React, {
  useState,
  useRef,
  KeyboardEvent,
  useEffect,
  useCallback,
} from "react";

interface Todo {
  text: string;
  isChecked: boolean;
}

interface TodoAppProps {
  theme: "light" | "dark";
}

const TodoApp: React.FC<TodoAppProps> = ({ theme }) => {
  const [todos, setTodos] = useState<Todo[]>([{ text: "", isChecked: false }]);
  const editableRef = useRef<HTMLDivElement | null>(null);

  const addTodo = (text: string): void => {
    setTodos((prevTodos) => [...prevTodos, { text, isChecked: false }]);
  };

  const toggleTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.innerText;
      if (value.trim() !== "") {
        const newTodos = [...todos];
        newTodos[newTodos.length - 1].text = value.trim(); // Save the current text
        setTodos(newTodos);
        addTodo("");
        if (editableRef.current) {
          editableRef.current.innerHTML = ""; // Clear the current editable div
        }
      }
    }
  };

  const handleDocumentKeyPress = useCallback<EventListener>(
    (event) => {
      const keyEvent = event as unknown as KeyboardEvent;

      if (
        todos[todos.length - 1].text === "" &&
        editableRef.current &&
        keyEvent.target === document.body
      ) {
        editableRef.current.focus();
      }
    },
    [todos]
  );


  useEffect(() => {
    document.addEventListener("keypress", handleDocumentKeyPress);
    return () => {
      document.removeEventListener("keypress", handleDocumentKeyPress);
    };
  }, [todos, handleDocumentKeyPress]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {todos.map((todo, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-start gap-4 w-full"
        >
          <div
            className={`cursor-pointer border-2 rounded-sm w-6 h-6 
                        ${theme === "light" ? "border-black" : "border-white"}
                        ${
                          todo.isChecked
                            ? theme === "light"
                              ? "bg-black"
                              : "bg-white"
                            : ""
                        }`}
            onClick={() => toggleTodo(index)}
          ></div>
          {index === todos.length - 1 ? (
            <div
              ref={editableRef}
              className="whitespace-pre-wrap w-full outline-none font-normal select-none leading-8 text-xl relative no-select"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyPress={handleKeyPress}
              onFocus={(event) => {
                if (event.currentTarget.innerHTML === "")
                  event.currentTarget.innerHTML = "<br>";
              }}
              onBlur={(event) => {
                if (event.currentTarget.innerHTML === "<br>")
                  event.currentTarget.innerHTML = "";
              }}
            ></div>
          ) : (
            <div className="whitespace-pre-wrap w-full outline-none font-normal select-none leading-8 text-xl relative no-select">
              {todo.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
