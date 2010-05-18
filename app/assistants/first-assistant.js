/* Copyright (c) 2010, Kevin Decker */
function FirstAssistant() {
    this.textModel = { value: "" };

    this.submitTapHandler = this.submitTap.bind(this);
}

FirstAssistant.prototype.setup = function() {
    this.controller.setupWidget("status-text", {}, this.textModel);

    this.controller.setupWidget("seed-status", {}, { label: $L("Seed Status") });
    this.controller.listen("seed-status", Mojo.Event.tap, this.submitTapHandler, false);
};

FirstAssistant.prototype.cleanup = function(event) {
    this.controller.stopListening("seed-status", Mojo.Event.tap, this.submitTapHandler, false);
};

FirstAssistant.prototype.submitTap = function(event) {
    this.seedStatus(this.textModel.value);
};

FirstAssistant.prototype.seedStatus = function(text) {
    this.controller.serviceRequest('palm://com.palm.applicationManager', {
        method: 'launch',
        parameters: {
            id: "com.palm.app.facebook",
            params: { status: text }
        },
        onFailure: function(response) {
            Mojo.Log.error("Seed Status Failure: %j", response.errorText);
        }
    });
};
