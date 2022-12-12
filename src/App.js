import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Formc from "react-bootstrap/Form";
import { HiBadgeCheck } from "react-icons/hi";
import "./App.css";
import Spinner from "react-bootstrap/Spinner";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [show, setShow] = useState(true);

  if (status === "success") {
    return (
      <h1 style={{ marginTop: "100px",display:"flex",alignItems:"center",justifyContent:"center",margin:"100px",fontSize:"18px"}}>
        <Alert variant="success">
          <p style={{textAlign:"center"}} >That's right!<HiBadgeCheck size="2em" /> </p> <p>In 1957, IBM (International Business Machines) introduced the FORTRAN (Formula Translator= Formula Translator) language, a low-level (close to machine language) programming language.</p>
        </Alert>
      </h1>
    );
  }

  async function handleSubmit(e) {
    setShow(true);
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
    setAnswer("");
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <div className="container App shadow" style={{ padding: "40px",width:"550px" }}>
      <h2>Mini quiz</h2>
      <p>
      What is the first programming language in the world?
      </p>
      <form onSubmit={handleSubmit}>
        <Formc.Control
          onFocus={() => {
            setShow(false);
            setError(null);
          }}
          type="text"
          placeholder="Type your answer"
          size="lg"
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />

        <Button
          style={{
            height: "50px",
            width: "150px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          type="submit"
          disabled={answer.length === 0 || status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <span>Loading </span>
              <Spinner animation="border" role="status"></Spinner>
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {error !== null && show && (
          <div className="mt-3" style={{ width: "450px" }}>
            {" "}
            <Alert
              variant="danger"
              onClose={() => {
                setShow(false);
                setError(null);
              }}
              dismissible
            >
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>Good guess but a wrong answer. Try again!</p>
            </Alert>
          </div>
        )}
      </form>
    </div>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "fortran";

      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
