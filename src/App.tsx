import { Routes, Route } from 'react-router'
import screens from './screens/index.js'
import Login from './screens/Login.js'

export default function App() {
	return (
		<Routes>
			<Route path="/payroll-ui/" element={<Login />} />
			{Object.entries(screens).map(([screenName, ScreenComponent]) => (
				<Route
					key={screenName}
					path={`/${screenName}`}
					element={<ScreenComponent />}
				/>
			))}
		</Routes>
	)
}
