import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default function Contacts() {
  let formElement = null;

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formElement,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent successfully!',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.log('Failed to send email.', error.text);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message. Please try again.',
            confirmButtonText: 'OK',
          });
        }
      );

    e.target.reset();
  }

  return (
    <ContactSection id="contacts" className="section py-5">
      <Container>
        <SectionHeading>Get in Touch</SectionHeading>
        <Divider />
        <RowWrapper className="row align-items-center">
          <FormColumn className="col-md-6 mb-5 mb-md-0">
            <StyledForm ref={(el) => (formElement = el)} onSubmit={sendEmail}>
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="What's your good name?"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  type="email"
                  name="user_email"
                  id="email"
                  placeholder="What's your email address?"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="What do you want to say?"
                  required
                ></Textarea>
              </FormGroup>
              <SubmitButton type="submit" className="btn btn-primary">
                Send
              </SubmitButton>
            </StyledForm>
          </FormColumn>
          <ModelColumn className="col-md-6 text-center">
            <StyledModelViewer
              src="/models/email_icon.glb"
              alt="3D Email Icon"
              auto-rotate
              camera-controls
              disable-zoom
            ></StyledModelViewer>
          </ModelColumn>
        </RowWrapper>
      </Container>
    </ContactSection>
  );
}


const ContactSection = styled.section`
  background: linear-gradient(135deg, #fffaf0, #f0e6d6);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const SectionHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #444;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 80px;
  height: 4px;
  background-color: #2daa9e;
  margin: 0 auto 40px auto;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormColumn = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const ModelColumn = styled.div`
  padding: 20px;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #2daa9e;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #2daa9e;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  background-color: #2daa9e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #66d2ce;
    transform: translateY(-3px);
  }
`;

const StyledModelViewer = styled('model-viewer')`
  width: 100%;
  height: 400px; /* Reduced height for a smaller model */
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;
