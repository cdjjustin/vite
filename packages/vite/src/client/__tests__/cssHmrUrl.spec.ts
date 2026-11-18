import { describe, expect, test } from 'vitest'
import { cleanCssUrl } from '../cssHmrUrl'

describe('cleanCssUrl', () => {
  test('preserves valueless Vue SFC style flags while dropping direct', () => {
    expect(
      cleanCssUrl(
        '/src/Comp.vue?direct&vue&type=style&index=0&scoped=x&lang.scss',
      ),
    ).toBe('/src/Comp.vue?vue&type=style&index=0&scoped=x&lang.scss')
  })

  test('preserves neighboring valueless flags', () => {
    expect(cleanCssUrl('/src/a.css?x=1&direct&y')).toBe('/src/a.css?x=1&y')
  })

  test('strips origin so path and link href still match', () => {
    const path = '/src/Comp.vue?direct&vue&type=style&index=0&lang.scss'
    const href =
      'http://localhost:5173/src/Comp.vue?direct&vue&type=style&index=0&lang.scss'
    expect(cleanCssUrl(href)).toBe(cleanCssUrl(path))
  })

  test('does not strip similarly named keys', () => {
    expect(cleanCssUrl('/src/a.css?direction=ltr&direct&directx')).toBe(
      '/src/a.css?direction=ltr&directx',
    )
    expect(cleanCssUrl('/src/a.css?x=direct&direct=1')).toBe(
      '/src/a.css?x=direct',
    )
  })

  test('handles missing, empty, and direct-only queries', () => {
    expect(cleanCssUrl('/src/a.css')).toBe('/src/a.css')
    expect(cleanCssUrl('/src/a.css?')).toBe('/src/a.css')
    expect(cleanCssUrl('/src/a.css?direct')).toBe('/src/a.css')
    expect(cleanCssUrl('/src/a.css?direct=')).toBe('/src/a.css')
  })
})
