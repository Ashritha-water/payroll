import { Routes, Route } from 'react-router'
import HomePage from './HomePage.js'
import screens from './screens/index.js'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
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
