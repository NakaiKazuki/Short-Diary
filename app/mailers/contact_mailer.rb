# frozen_string_literal: true

class ContactMailer < ApplicationMailer
  def contact_mail
    if Rails.env.production?
      mail(to: Rails.application.credentials.dig(:mail, :reception), subject: I18n.t('contact_mailer.subject'))
    else
      mail(to: 'reception@example.com', subject: I18n.t('contact_mailer.subject'))
    end
  end
end
