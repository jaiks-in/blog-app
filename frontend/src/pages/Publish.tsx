import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

interface DataType {
  title: string;
  content: string;
}

function Publish() {
  const navigate = useNavigate();
  
  // Correct useRef initial value as null
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Safe way to access the input values, checking if ref is not null
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";

    const blogData: DataType = {
      title,
      content,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, blogData, {
        headers: {
          Authorization: localStorage.getItem("jwt") || "",
        },
      });

      console.log(response.data);
      navigate("/success"); // Redirect on successful publish
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input ref={titleRef} className="b-2" type="text" required />
      </label>
      <label>
        Content:
        <input ref={contentRef} className="b-2" type="text" required />
      </label>
      <button type="submit">Publish</button>
    </form>
  );
}

export default Publish;
