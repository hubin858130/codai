// eslint-rules/index.js
const noProtobufObjectLiterals = require("./no-protobuf-object-literals")
const noGrpcClientObjectLiterals = require("./no-grpc-client-object-literals")
<<<<<<< HEAD
const noVscodePostmessage = require("./no-vscode-postmessage")
=======
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

module.exports = {
	rules: {
		"no-protobuf-object-literals": noProtobufObjectLiterals,
		"no-grpc-client-object-literals": noGrpcClientObjectLiterals,
<<<<<<< HEAD
		"no-vscode-postmessage": noVscodePostmessage,
=======
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	},
	configs: {
		recommended: {
			plugins: ["local"],
			rules: {
				"local/no-protobuf-object-literals": "error",
				"local/no-grpc-client-object-literals": "error",
<<<<<<< HEAD
				"local/no-vscode-postmessage": "error",
=======
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
			},
		},
	},
}
