"use client";
import { Provider } from "react-redux";
import { store } from "../../lib/redux/store";
import { ResumeForm } from "../../components/ResumeForm";
import { Resume } from "../../components/Resume";
import Header from "../../components/Header";
import Footer from"../../components/Footer";

export default function Create() {
  return (
    <div>
      <Header />
    <Provider store={store}>
      <main className="main-container">
        <div className="grid-container">
          <div className="form-section">
            <ResumeForm />
          </div>
          <div className="resume-section">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
    <Footer />
    </div>
  );
}
