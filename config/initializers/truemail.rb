require 'truemail'

Truemail.configure do |config|
  # Required parameter. Must be an existing email on behalf of which verification will be performed
    config.verifier_email = 'verifier@example.com'

  # Optional parameter. Must be an existing domain on behalf of which verification will be performed.
  # By default verifier domain based on verifier email
  config.verifier_domain = 'somedomain.com'

  # Optional parameter. You can override default regex pattern
#   config.email_pattern = /regex_pattern/

  # Optional parameter. You can override default regex pattern
#   config.smtp_error_body_pattern = /regex_pattern/

  # Optional parameter. Connection timeout is equal to 2 ms by default.
  config.connection_timeout = 4

  # Optional parameter. A SMTP server response timeout is equal to 2 ms by default.
  config.response_timeout = 4

  # Optional parameter. Total of connection attempts. It is equal to 2 by default.
  # This parameter uses in mx lookup timeout error and smtp request (for cases when
  # there is one mx server).
  config.connection_attempts = 3

  # Optional parameter. You can predefine default validation type for
  # Truemail.validate('email@email.com') call without with-parameter
  # Available validation types: :regex, :mx, :smtp
  config.default_validation_type = :smtp

  # Optional parameter. You can predefine which type of validation will be used for domains.
  # Also you can skip validation by domain. Available validation types: :regex, :mx, :smtp
  # This configuration will be used over current or default validation type parameter
  # All of validations for 'somedomain.com' will be processed with regex validation only.
  # And all of validations for 'otherdomain.com' will be processed with mx validation only.
  config.validation_type_for = { 'somedomain.com' => :mx, 'otherdomain.com' => :smtp }

  # Optional parameter. Validation of email which contains whitelisted domain always will
  # return true. Other validations will not processed even if it was defined in validation_type_for
  config.whitelisted_domains = ['somedomain1.com', 'somedomain2.com']

  # Optional parameter. Validation of email which contains whitelisted domain always will
  # return false. Other validations will not processed even if it was defined in validation_type_for
  config.blacklisted_domains = ['somedomain1.com', 'somedomain2.com']

  # Optional parameter. This option will be parse bodies of SMTP errors. It will be helpful
  # if SMTP server does not return an exact answer that the email does not exist
  # By default this option is disabled, available for SMTP validation only.
  config.smtp_safe_check = true
end