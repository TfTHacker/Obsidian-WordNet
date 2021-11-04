import { addIcon } from 'obsidian';

export function addIcons(): void {
    addIcon(
		"wordnet",
		`<path fill="currentColor" stroke="currentColor" d="M 81.867188 20.132812 L 81.867188 5.859375 L 84.144531 5.859375 C 85.761719 5.859375 87.074219 4.546875 87.074219 2.929688 C 87.074219 1.3125 85.761719 0 84.144531 0 L 24.375 0 C 18.0625 0 12.925781 5.125 12.925781 11.429688 L 12.925781 92.230469 C 12.925781 96.515625 16.417969 100 20.707031 100 L 79.78125 100 C 83.800781 100 87.074219 96.730469 87.074219 92.714844 L 87.074219 26.570312 C 87.074219 23.414062 84.835938 20.773438 81.867188 20.132812 Z M 18.785156 11.429688 C 18.785156 8.359375 21.292969 5.859375 24.375 5.859375 L 76.007812 5.859375 L 76.007812 19.988281 L 24.375 19.988281 C 21.292969 19.988281 18.785156 17.488281 18.785156 14.417969 Z M 81.214844 92.714844 C 81.214844 93.5 80.570312 94.140625 79.78125 94.140625 L 20.707031 94.140625 C 19.648438 94.140625 18.785156 93.285156 18.785156 92.230469 L 18.785156 24.390625 C 20.441406 25.316406 22.347656 25.847656 24.375 25.847656 L 80.480469 25.847656 C 80.882812 25.847656 81.214844 26.171875 81.214844 26.570312 Z M 81.214844 92.714844 "/>
		<path fill="currentColor" stroke="currentColor" d="M 33.519531 45.613281 C 33.359375 45.121094 32.476562 44.074219 30.503906 44.074219 C 28.269531 44.074219 27.648438 45.121094 27.488281 45.613281 L 21.992188 63.644531 C 21.832031 64.316406 22.25 64.925781 22.890625 65.296875 C 23.53125 65.671875 24.199219 65.859375 24.886719 65.859375 C 25.734375 65.859375 26.238281 65.574219 26.394531 65.003906 L 27.398438 61.308594 L 33.636719 61.308594 L 34.640625 65.003906 C 34.800781 65.574219 35.300781 65.859375 36.148438 65.859375 C 36.839844 65.859375 37.503906 65.671875 38.144531 65.296875 C 38.785156 64.925781 39.183594 64.222656 39.046875 63.644531 Z M 28.347656 57.761719 L 30.503906 49.839844 L 32.660156 57.761719 Z M 28.347656 57.761719 "/>
		<path fill="currentColor" stroke="currentColor" d="M 54.359375 54.15625 C 56.03125 53.425781 56.871094 51.878906 56.871094 49.511719 C 56.871094 46.007812 54.898438 44.25 50.957031 44.25 L 44.898438 44.25 C 43.40625 44.25 42.890625 45.21875 42.890625 45.671875 L 42.890625 64.46875 C 42.890625 64.84375 43.457031 65.859375 44.898438 65.859375 L 51.460938 65.859375 C 53.273438 65.859375 54.71875 65.351562 55.792969 64.335938 C 56.867188 63.324219 57.402344 61.710938 57.402344 59.503906 L 57.402344 58.882812 C 57.402344 57.503906 57.148438 56.464844 56.632812 55.765625 C 56.121094 55.066406 55.363281 54.527344 54.359375 54.15625 Z M 47.472656 48.273438 L 50.574219 48.273438 C 52.148438 48.273438 52.257812 49.789062 52.257812 50.339844 C 52.257812 50.894531 52.074219 52.378906 50.574219 52.378906 L 47.472656 52.378906 Z M 52.792969 59.121094 C 52.792969 60.933594 52.003906 61.839844 50.425781 61.839844 L 47.472656 61.839844 L 47.472656 55.929688 L 50.425781 55.929688 C 52.003906 55.929688 52.792969 56.835938 52.792969 58.648438 Z M 52.792969 59.121094 "/>
		<path fill="currentColor" stroke="currentColor" d="M 68.902344 48.273438 C 70.597656 48.273438 71.472656 49.160156 71.53125 50.933594 C 71.589844 51.859375 72.359375 52.320312 73.835938 52.320312 C 75.21875 52.320312 76.144531 51.78125 76.144531 50.132812 C 76.144531 48.300781 75.449219 46.863281 74.058594 45.820312 C 72.671875 44.773438 70.890625 44.253906 68.722656 44.253906 C 66.617188 44.253906 64.90625 44.8125 63.59375 45.9375 C 62.285156 47.058594 61.628906 48.824219 61.628906 51.226562 L 61.628906 59.0625 C 61.628906 61.464844 62.285156 63.230469 63.59375 64.351562 C 64.90625 65.476562 66.617188 66.039062 68.722656 66.039062 C 70.890625 66.039062 72.671875 65.484375 74.058594 64.382812 C 75.449219 63.277344 76.144531 61.769531 76.144531 59.859375 C 76.144531 58.714844 75.660156 57.671875 73.808594 57.671875 C 72.371094 57.671875 71.609375 58.136719 71.53125 59.0625 C 71.421875 60.222656 70.800781 62.015625 68.929688 62.015625 C 67.136719 62.015625 66.242188 61.03125 66.242188 59.0625 L 66.242188 51.226562 C 66.242188 49.257812 67.128906 48.273438 68.902344 48.273438 Z M 68.902344 48.273438 "/>`
	);
}