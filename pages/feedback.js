import {useState} from 'react';
import axios from "axios";
import Message from "../components/Message";
import SimpleHeader from "../components/SimpleHeader";

const Feedback = () => {
    const [status, setStatus] = useState("")
    const [submitting, setSubmitting] = useState(false)


    const handleServerResponse = (ok, msg, form) => {
        setSubmitting(false)
        setStatus(msg)

        if (ok) {
            form.reset();
        }
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        setSubmitting(true)
        axios({
            method: "post",
            url: "https://getform.io/f/c223ec51-cf67-408c-8661-b7ef918f27cb",
            data: new FormData(form)
        })
            .then(r => {
                handleServerResponse(true, "Thanks!", form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    };

    return (
        <div>
            {status && <Message message={status} type={"success"}/>}

            <SimpleHeader text={"Feedback"}/>

            {submitting && <div>is submitting</div>}
            <div className={`max-w-xl mx-auto`}>
                <form onSubmit={handleOnSubmit}>
                    <input className={`w-full my-2`} required type="email" name="email" placeholder="Your Email"/> <br/>
                    <input className={`w-full my-2`} required type="text" name="name" placeholder="Your Name"/><br/>
                    <textarea className={`w-full my-2 h-24`} required type="text" name="message"
                              placeholder="Your Message"/> <br/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
