import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [latency, setLatency] = useState(24);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showFallback, setShowFallback] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * (40 - 10 + 1) + 10));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleMailto = () => {
        const subject = encodeURIComponent(`Portfolio Contact: ${name || 'New Lead'}`);
        const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:hithabadikillaya@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation & sanitization
        const trimmedName = name.trim().slice(0, 100);
        const trimmedEmail = email.trim().slice(0, 254);
        const trimmedMessage = message.trim().slice(0, 5000);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setToast({ show: true, message: 'Please complete all fields.', type: 'error' });
            setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setToast({ show: true, message: 'Please provide a valid email address.', type: 'error' });
            setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
            return;
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

        const templateParams = {
            from_name: trimmedName,
            user_name: trimmedName,
            from_email: trimmedEmail,
            user_email: trimmedEmail,
            message: trimmedMessage,
            reply_to: trimmedEmail,
        };

        // Ensure EmailJS configuration is present
        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration missing or invalid');
            setShowFallback(true);
            setToast({ show: true, message: 'Service unconfigured. Opening mail client...', type: 'error' });
            setTimeout(() => {
                setToast((t) => ({ ...t, show: false }));
                handleMailto();
            }, 2000);
            return;
        }

        setIsSending(true);
        try {
            emailjs.init(publicKey);

            const result = await emailjs.send(serviceId, templateId, templateParams);

            if (result.status === 200 || result.text === 'OK') {
                setIsSending(false);
                setSubmitted(true);
                setName(''); setEmail(''); setMessage('');
                setToast({ show: true, message: 'Transmission Successful — i will get back to you soon!', type: 'success' });
                setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                throw new Error(result.text || 'Unknown response from server');
            }
        } catch (err) {
            setIsSending(false);
            setShowFallback(true);
            console.error('EmailJS transmission failed:', err);

            let errorMessage = 'Transmission Failed.';
            if (err?.text) errorMessage = err.text;
            else if (err?.message) errorMessage = err.message;

            setToast({ show: true, message: `${errorMessage} Try manual send.`, type: 'error' });
            setTimeout(() => setToast((t) => ({ ...t, show: false })), 6000);
        }
    };

    return (
        <div className="min-h-screen py-6 px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center">
            <>
                <title>Contact | Hitha </title>
                <meta name="description" content="Initialize connection." />
                <meta property="og:title" content="Contact | Hitha Portfolio" />
                <meta property="og:description" content="Initialize connection." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact | Hitha Portfolio" />
                <meta name="twitter:description" content="Initialize connection." />
            </>

            <div aria-live="polite">
                {toast.show && (
                    <div className="fixed top-6 right-6 z-50 w-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className={`px-4 py-3 rounded-md shadow-lg max-w-xs ${toast.type === 'success' ? 'bg-secondary text-paper' : 'bg-red-600 text-paper'}`}
                        >
                            <div className="text-sm font-medium">{toast.message}</div>
                        </motion.div>
                    </div>
                )}
            </div>

            <div className="mb-12 flex justify-between items-end">
                <div>
                    <span className="text-secondary font-mono text-xs tracking-widest block mb-4">
                        ssh user@hitha.tech
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-primary">Initialize Connection</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 font-mono text-xs text-secondary/60">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>PING: {latency}ms</span>
                </div>
            </div>

            <div className="w-full bg-black border border-white/20 rounded-md shadow-2xl overflow-hidden font-mono">
                {/* Terminal Window Header */}
                <div className="bg-white/10 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="flex-1 text-center text-xs text-primary/40">bash — 80x24</div>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-12 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 max-w-2xl"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name-input" className="block text-secondary text-xs">root@hitha:~/contact# enter_identity</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">&gt;</span>
                                        <input
                                            id="name-input"
                                            required
                                            aria-required="true"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email-input" className="block text-secondary text-xs">root@hitha:~/contact# enter_email</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">&gt;</span>
                                        <input
                                            id="email-input"
                                            type="email"
                                            required
                                            aria-required="true"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message-input" className="block text-secondary text-xs">root@hitha:~/contact# define_payload</label>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">&gt;</span>
                                        <textarea
                                            id="message-input"
                                            required
                                            aria-required="true"
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20 resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 flex flex-wrap gap-4 items-center">
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        aria-busy={isSending}
                                        className={`text-primary ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'} bg-white/5 ${isSending ? '' : 'hover:bg-secondary'} border border-secondary/50 px-6 py-2 transition-all text-xs uppercase tracking-widest`}
                                    >
                                        {isSending ? 'Sending…' : 'Execute_Send'}
                                    </button>

                                    {showFallback && (
                                        <button
                                            type="button"
                                            onClick={handleMailto}
                                            className="text-secondary hover:text-primary text-[10px] uppercase underline decoration-secondary/30 underline-offset-4 transition-colors"
                                        >
                                            Send via Email App
                                        </button>
                                    )}
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col justify-center items-center text-center space-y-4 pt-12"
                            >
                                <div className="text-green-500 text-6xl mb-4">✓</div>
                                <h3 className="text-2xl text-primary">Transmission Successful</h3>
                                <p className="text-primary/60 text-sm">Target host acknowledged receipt. Connection closed.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-xs text-secondary underline hover:text-primary transition-colors"
                                >
                                    ./open_new_connection.sh
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-12 text-center text-primary/30 font-mono text-xs">
                <p>Let me know if you could access the vault. i&apos;d love to hear your thoughts!</p>
                <p>hithabadikillaya@gmail.com // Ping me, I&apos;ll Ack.</p>
            </div>
        </div>
    );
};

export default Contact;
