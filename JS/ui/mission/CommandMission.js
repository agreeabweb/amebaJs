define(["require", "exports", "../../const/ServiceObj"], function (require, exports, ServiceObj_1) {
    "use strict";
    /**
     * Created by Oliver on 2016-08-16 0016.
     */
    var CommandMission = (function () {
        function CommandMission(command) {
            this.command = command;
        }
        CommandMission.prototype.execute = function (panel, callback) {
            var commandExecutor = panel.getContext().get(ServiceObj_1.ServiceObj.CommandHandlerExecutor);
            this.command.setContext(panel.getContext());
            this.command.setCallback(callback);
            commandExecutor.execute(this.command, this.command.getCallback());
        };
        return CommandMission;
    }());
    exports.CommandMission = CommandMission;
});
//# sourceMappingURL=CommandMission.js.map