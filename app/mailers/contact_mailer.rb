# frozen_string_literal: true

class ContactMailer < ApplicationMailer
  default to: -> { to }

  def contact_mail
    mail(subject: I18n.t('contact_mailer.subject'))
  end

  private

    def to
      Rails.env.production? ? Rails.application.credentials.dig(:mail, :reception) : 'reception@example.com'
    end
end
