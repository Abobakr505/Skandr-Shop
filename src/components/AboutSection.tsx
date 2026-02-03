import { motion } from 'framer-motion';
import { Award, Clock, Heart, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'جودة عالية',
    description: 'نستخدم أجود أنواع الكبد الطازج يومياً'
  },
  {
    icon: Clock,
    title: 'خدمة سريعة',
    description: 'توصيل سريع لطلبك في أقل من 30 دقيقة'
  },
  {
    icon: Heart,
    title: 'وصفة أصلية',
    description: 'نحافظ على الطعم الإسكندراني الأصيل'
  },
  {
    icon: Users,
    title: 'خبرة طويلة',
    description: 'أكثر من 35 عاماً في خدمة عملائنا'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">من نحن</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مطعم إسكندر هو الوجهة الأولى لعشاق الكبدة الإسكندراني الأصلية في مصر.
            منذ عام 1985، نقدم أشهى الأطباق بأعلى معايير الجودة والنظافة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-[#004f49] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/about.jpg"
              alt="مطعم إسكندر"
              className="rounded-xl shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">قصتنا</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              بدأت رحلتنا عام 1985 في قلب الإسكندرية، حيث كان حلمنا تقديم أفضل كبدة
              إسكندراني بالطريقة التقليدية الأصيلة. على مر السنين، أصبحنا الاختيار الأول
              لآلاف العائلات المصرية.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              نحرص على اختيار أجود أنواع الكبد الطازج يومياً، ونستخدم التوابل
              والبهارات الأصلية لضمان أفضل مذاق. فريقنا من الطهاة المحترفين يعمل بشغف
              لإعداد كل طبق بأعلى معايير الجودة.
            </p>
            <p className="text-gray-600 leading-relaxed">
              اليوم، نفخر بخدمة عملائنا في جميع أنحاء مصر من خلال خدمة التوصيل السريع،
              مع الحفاظ على نفس الجودة والطعم الذي عشقه الجميع منذ البداية.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
