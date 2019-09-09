class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        
        "/"(view:"/camaraOcr/index")
        "500"(view:'/error')
	}
}
