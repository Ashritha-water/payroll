import { Routes, Route } from 'react-router'
import screens from './screens/index.js'
import Login from './screens/Login.js'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			{Object.entries(screens).map(([screenName, ScreenComponent]) => (
				<Route
					key={screenName}
					path={`/${screenName}`}
					element={<ScreenComponent />}
				/>
			))}
			<Route path="/employee/:id/profile" element={<screens.EmployeeProfile />} />
			<Route path="/employee/:id/ServiceBook" element={<screens.ServiceBook />} />
			<Route path="/employee/:id/gpf" element={<screens.GPFStatement />} />
			<Route path="/employee/:id/nps" element={<screens.NPSPension />} />
			<Route path="/employee/:id/acr" element={<screens.ACRPerformance />} />
			<Route path="/employee/:id/payroll" element={<screens.Payroll />} />
			<Route path="/employee/:id/leave" element={<screens.LeaveManagement />} />
		</Routes>
	)
}
