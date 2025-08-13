import React, { useState } from "react";
import TopMenu from "../components/TopMenu";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // chặn reload trang
    setNotice("");
    // validation đơn giản
    if (!form.name || !form.email || !form.message) {
      setNotice("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      setSubmitting(true);
      // TODO: gọi API backend tại đây
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });

      // demo: giả lập thành công
      await new Promise((r) => setTimeout(r, 800));
      setNotice("Đã gửi thành công! Chúng tôi sẽ liên hệ sớm.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setNotice("Gửi thất bại. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact">
      <TopMenu data={true} />
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h3>Leave us your info</h3>

          {notice && <p className="formNotice">{notice}</p>}

          <div className="inputItem">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="inputItem">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="inputItem">
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "SENDING..." : "SUBMIT"}
          </button>
        </form>

        <div className="address">
          <div className="addressItem">
            <h3>ADDRESS</h3>
            <p>1 Nguyễn Cơ Thạch, An Lợi Đông Ward, Ho Chi Minh City, Vietnam</p>
          </div>
          <div className="addressItem">
            <h3>PHONE</h3>
            <p>
              <a href="tel:+84903052135">+84 903 052 135</a>
            </p>
          </div>
          <div className="addressItem">
            <h3>EMAIL</h3>
            <p>
              <a href="mailto:namihome.saigon@gmail.com">
                namihome.saigon@gmail.com
              </a>
            </p>
          </div>
          <div className="addressItem">
            <h3>LOCATION</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.586137507486!2d106.72354837605421!3d10.766344889381815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525f5294176b9%3A0x9bb6aa25263cf0f1!2zMSBOZ3V54buFbiBDxqEgVGjhuqFjaCwgQW4gTOG7o2kgxJDDtG5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1753421207332!5m2!1sen!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, width: "100%", height: 300 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;