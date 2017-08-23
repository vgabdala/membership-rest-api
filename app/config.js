export default {

    mongo: {
     	default: {
    		secret: 'vinnieabdala',
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