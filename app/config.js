export default {

    mongo: {
     	default: {
    		port: 27017
    	},
    	development: {
				db: 'membershipdev',
				host: 'localhost'
    	},
    	production: {
				db: 'membership',
				host: 'localhost'
    	}
    }

};