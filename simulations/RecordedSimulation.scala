
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class RecordedSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("https://inrupt.net")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Origin" -> "https://inrupt.net",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_2 = Map("Origin" -> "http://localhost:3000")

	val headers_4 = Map(
		"Access-Control-Request-Headers" -> "content-type",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "http://localhost:3000")

	val headers_5 = Map(
		"Origin" -> "http://localhost:3000",
		"content-type" -> "application/json")

	val headers_7 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"1da71-7438674ba0"""")

	val headers_8 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"388-7438674ba0"""")



	val scn = scenario("RecordedSimulation")
		.exec(http("request_0")
			.get("/authorize?scope=openid&client_id=b9a6319f5bb3653c767496c17770e952&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvd2VsY29tZSIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJRU1JEUFVObWxhQWg2cjl3eGV0cWZEN1c3cHdld0p3ZzNobDAyd2oxZ1pBIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiI0VG1zYUtSWlVhaDVDWVJweldxc2RYQkZKV0pXdHRfSWhCRnJwRUFVVlRuemkxTkUxVm1NWDlQVmRpaU95N3NXVXJid0gtMEpOQ0tVcTloNk1mbFFEaUpHTDRfaGVLU1JVY01jSnhLT0VDdGNiejJPY2RCcEptV2psajE1cWYwRERCYTdQSmM4WlBkREZVdE5famwzVVRLRkV5MS1ySW5nakdJMFd2X29DdmNuWkp5MW9jNVFxLU40T1VwZ0VvbnpjN1VtN1JVd2g2ZWxCVFF5SmZIQzg4RWpxUEc0cVZhcFg1V1M3QmlzeE9iNkFkRW1EblV0SEVhckZqVHhzNHpGQTNoSFV6X2RsZkhIWVBtMThPdlBoUXhDR3NOVlNkQTB5X3RHLVNUeHFDN2tETkxIN0JUdExaX3VyMjFoWU1hOWZJdEZLeWI3S19mVFpIcktsZWh6M1EifX0.&state=mULZMcRL2XJrjRIgC7xji9LGMvJGJDdlAvRQFs_Eb6k")
			.headers(headers_0)
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0000_response.html"))))
		.pause(13)
		.exec(http("request_1")
			.post("/login/password")
			.headers(headers_1)
			.formParam("username", "uo264254")
			.formParam("password", "17473372aA")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "b9a6319f5bb3653c767496c17770e952")
			.formParam("redirect_uri", "http://localhost:3000/welcome")
			.formParam("state", "mULZMcRL2XJrjRIgC7xji9LGMvJGJDdlAvRQFs_Eb6k")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvd2VsY29tZSIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJRU1JEUFVObWxhQWg2cjl3eGV0cWZEN1c3cHdld0p3ZzNobDAyd2oxZ1pBIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiI0VG1zYUtSWlVhaDVDWVJweldxc2RYQkZKV0pXdHRfSWhCRnJwRUFVVlRuemkxTkUxVm1NWDlQVmRpaU95N3NXVXJid0gtMEpOQ0tVcTloNk1mbFFEaUpHTDRfaGVLU1JVY01jSnhLT0VDdGNiejJPY2RCcEptV2psajE1cWYwRERCYTdQSmM4WlBkREZVdE5famwzVVRLRkV5MS1ySW5nakdJMFd2X29DdmNuWkp5MW9jNVFxLU40T1VwZ0VvbnpjN1VtN1JVd2g2ZWxCVFF5SmZIQzg4RWpxUEc0cVZhcFg1V1M3QmlzeE9iNkFkRW1EblV0SEVhckZqVHhzNHpGQTNoSFV6X2RsZkhIWVBtMThPdlBoUXhDR3NOVlNkQTB5X3RHLVNUeHFDN2tETkxIN0JUdExaX3VyMjFoWU1hOWZJdEZLeWI3S19mVFpIcktsZWh6M1EifX0.")
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0001_response.html"))))
		.pause(5)
		.exec(http("request_2")
			.get("/.well-known/openid-configuration")
			.headers(headers_2)
			.resources(http("request_3")
			.get("/jwks")
			.headers(headers_2)
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0003_response.json"))),
            http("request_4")
			.options("/register")
			.headers(headers_4),
            http("request_5")
			.post("/register")
			.headers(headers_5)
			.body(RawFileBody("/recordedsimulation/0005_request.json"))
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0005_response.json"))),
            http("request_6")
			.get("/authorize?scope=openid&client_id=57ffa9bc1cf85f811734510e14cfbb89&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvd2VsY29tZSIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJHUzgxcWVxcTFKQ2lxRHliX2ZzaXdRa3pSLWdHNVJhbGZWODNWZEcyeWswIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ1c1NPQTZ2V3dzbjlaUXJETzNiM28zYmwtOVNCYmRqUXRKYVMzUm1NV2dBX2UtOXBDdk1VOGJqLTlQLUF0MVFpLUZKU2c1OFhlSGo0T3FQOVBmM0U5emNqaGM0U3RyMkp6MldBOWlpaUdwWDNmZTVFUV9WN0YzT0hNcVlEQnNZaXdxOEJSUS1pZ3dpQXY0bnJOS0hmYmp6MFVPbVZqWkotemxzWHdBWEtKRWtaMXFnWjF2TzVYWExuWU9VZEs3RnhjQWtBU3ZnTnlzWkRadjI0dS11OGY1TFY3VThiSm10dkFNdElKTFdQSm9nODZkc3pOZUVZZVN4T1pEZ3N2WmtFWDZ2VEtNcGIwYWZUX3dmYlNqNlkwazFRcFQxZ3d6OXBCNE1qSE5wUGxjYzhvNWlQRVlfTjNXM1RURUVleF83dFItV1ZYa3UwanM2ZEVsSGxNRks0RlEifX0.&state=EW2dUb52h5RaPe_6ruZ1aEDOhJun3bsCPvfaR0Yroyo")
			.headers(headers_0)
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0006_response.html"))),
            http("request_7")
			.get("/common/css/bootstrap.min.css")
			.headers(headers_7),
            http("request_8")
			.get("/common/css/solid.css")
			.headers(headers_8))
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0002_response.json"))))
		.pause(7)
		.exec(http("request_9")
			.post("/login/password")
			.headers(headers_1)
			.formParam("username", "uo264254")
			.formParam("password", "17473372aA")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "57ffa9bc1cf85f811734510e14cfbb89")
			.formParam("redirect_uri", "http://localhost:3000/welcome")
			.formParam("state", "EW2dUb52h5RaPe_6ruZ1aEDOhJun3bsCPvfaR0Yroyo")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvd2VsY29tZSIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJHUzgxcWVxcTFKQ2lxRHliX2ZzaXdRa3pSLWdHNVJhbGZWODNWZEcyeWswIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ1c1NPQTZ2V3dzbjlaUXJETzNiM28zYmwtOVNCYmRqUXRKYVMzUm1NV2dBX2UtOXBDdk1VOGJqLTlQLUF0MVFpLUZKU2c1OFhlSGo0T3FQOVBmM0U5emNqaGM0U3RyMkp6MldBOWlpaUdwWDNmZTVFUV9WN0YzT0hNcVlEQnNZaXdxOEJSUS1pZ3dpQXY0bnJOS0hmYmp6MFVPbVZqWkotemxzWHdBWEtKRWtaMXFnWjF2TzVYWExuWU9VZEs3RnhjQWtBU3ZnTnlzWkRadjI0dS11OGY1TFY3VThiSm10dkFNdElKTFdQSm9nODZkc3pOZUVZZVN4T1pEZ3N2WmtFWDZ2VEtNcGIwYWZUX3dmYlNqNlkwazFRcFQxZ3d6OXBCNE1qSE5wUGxjYzhvNWlQRVlfTjNXM1RURUVleF83dFItV1ZYa3UwanM2ZEVsSGxNRks0RlEifX0.")
			.check(status.is(302))
			.check(bodyBytes.is(RawFileBody("/recordedsimulation/0009_response.html"))))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}