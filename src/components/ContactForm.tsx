import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  return (
    <section id="contato" className="py-12 md:py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            {t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span> {t('contact.titleEnd')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground px-4">
            {t('contact.subtitle')}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 md:p-8 bg-card border-border">
          <form className="space-y-4 md:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t('contact.fullName')} {t('contact.required')}
                </label>
                <Input 
                  placeholder={t('contact.fullName')}
                  className="bg-background border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t('contact.company')} {t('contact.required')}
                </label>
                <Input 
                  placeholder={t('contact.company')}
                  className="bg-background border-border"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t('contact.email')} {t('contact.required')}
                </label>
                <Input 
                  type="email"
                  placeholder={t('contact.email')}
                  className="bg-background border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t('contact.phone')} {t('contact.required')}
                </label>
                <Input 
                  type="tel"
                  placeholder={t('contact.phone')}
                  className="bg-background border-border"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t('contact.projectDescription')} {t('contact.required')}
              </label>
              <Textarea 
                placeholder={t('contact.projectPlaceholder')}
                className="min-h-32 bg-background border-border resize-none"
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                0/1000 {t('contact.characters')}
              </p>
            </div>

            <Button type="submit" className="w-full btn-primary text-base md:text-lg py-5 md:py-6">
              <Send className="mr-2 h-4 md:h-5 w-4 md:w-5" />
              {t('contact.submit')}
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 text-muted-foreground">
          <a href="mailto:contato@industriavisual.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-5 w-5" />
            contato@industriavisual.com.br
          </a>
          <a href="tel:+5511999999999" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-5 w-5" />
            (11) 99999-9999
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
