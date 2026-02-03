import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        '<YOUR_SERVICE_ID>',
        '<YOUR_TEMPLATE_ID>',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        '<YOUR_PUBLIC_KEY>'
      );

      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال بنجاح ',
        text: 'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#004f49',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ ',
        text: 'لم يتم إرسال الرسالة، حاول مرة أخرى',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#b91c1c',
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">

        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">اتصل بنا</h2>
          <p className="text-xl text-gray-600">
            نحن هنا للإجابة على جميع استفساراتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              معلومات التواصل
            </h3>

            <div className="space-y-6">
              {[ 
                { icon: Phone, title: 'الهاتف', value: '03-4567890' },
                { icon: Mail, title: 'البريد الإلكتروني', value: 'info@eskander.com' },
                { icon: MapPin, title: 'العنوان', value: 'الإسكندرية، شارع فؤاد، رقم 123' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} whileHover={{ x: 8 }} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#004f49] rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
                        <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4">ساعات العمل</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">السبت - الخميس: 10:00 ص - 2:00 ص</p>
                <p className="text-gray-700">الجمعة: 12:00 م - 2:00 ص</p>
              </div>
            </div>
          </motion.div>

          {/* الفورم */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              required
              placeholder="أدخل اسمك"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004f49]"
            />

            <input
              type="email"
              required
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004f49]"
            />

            <textarea
              required
              rows={5}
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#004f49]"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-[#004f49] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              إرسال الرسالة
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
