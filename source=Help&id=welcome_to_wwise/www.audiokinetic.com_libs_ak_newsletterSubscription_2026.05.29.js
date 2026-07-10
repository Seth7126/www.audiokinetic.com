function AK_NewsletterSubscription(options) {
	var settings = $.extend({
		subscriptionEndpointURL: '/',
		formToken: '',
		modalTitle: "Subscribe to our Blog",
		modalContent: "",
		modalSubscribeButtonLabel: "Subscribe",
		modalCancelButtonLabel: "Cancel",
		emailInputFieldSelector: '#subscribe_email',
		jobTitleInputFieldSelector: '#subscribe_title',
		subscriptionThankYouMessage: "Thank you for subscribing",
		subscriptionErrorMessage: "There was an error"
	}, options);

	this.subscriptionEndpointURL = settings.subscriptionEndpointURL;
	this.formToken = settings.formToken;

	this.modalTitle = settings.modalTitle;
	this.modalContent = settings.modalContent;
	this.modalSubscribeButtonLabel = settings.modalSubscribeButtonLabel;
	this.modalCancelButtonLabel = settings.modalCancelButtonLabel;

	this.emailInputFieldSelector = settings.emailInputFieldSelector;
	this.jobTitleInputFieldSelector = settings.jobTitleInputFieldSelector;

	this.subscriptionThankYouMessage = settings.subscriptionThankYouMessage;
	this.subscriptionErrorMessage = settings.subscriptionErrorMessage;
};

AK_NewsletterSubscription.prototype.open = function () {
	var that = this; // For anonymous functions inside this scope
	var box = bootbox.dialog({
		title : this.modalTitle,
		message : this.modalContent,
		buttons : {
			subscribe : {
				label : this.modalSubscribeButtonLabel,
				className : "btn-primary",
				callback : function() {
					if (that.verifyEmail(box.find(that.emailInputFieldSelector)) === false) { return false; }
					$.post(
						that.subscriptionEndpointURL,
						{ 
							subscribe_blog_token: that.formToken,
							subscribe_blog_email: $(box.find(that.emailInputFieldSelector)).val(),
							subscribe_blog_job_title: $(box.find(that.jobTitleInputFieldSelector)).val()
						},
						function(response) {
							bootbox.hideAll();
							if ( typeof gtag === 'function' ) {
								gtag('event', 'Subscribe', {
									'event_category': 'Subscriptions',
									'event_label': 'Blog'
								});
							} 
							if (response == 1) {
								bootbox.alert(that.subscriptionThankYouMessage);
							} else {
								bootbox.alert(that.subscriptionErrorMessage);
							}
						}
					);
				}    
			},
			cancel : {
				label : this.modalCancelButtonLabel,
				className : "btn-default"
			}
		}
	});
};

AK_NewsletterSubscription.prototype.verifyEmail = function (inputSelector) {
	if ( !$.trim($(inputSelector).val()) ) {
		$(inputSelector).focus().stop().css("background-color", "#ff5d5d").animate({ backgroundColor: "transparent"}, 500);
		return false;
	}

	// This email regex:
	// - Covers a broader set of emails than our previous incantation
	// - Validates the bare minimum of what an email address should be, which is enough for this use-case
	// - Doesn't require a PHP function to centralize it
	// - Can be grokked by a mere human
	var filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if ( filter.test($.trim($(inputSelector).val())) == false ) {
		$(inputSelector).focus().stop().css("background-color", "#ff5d5d").animate({ backgroundColor: "transparent"}, 500);
		return false;
	}
	return true;
};