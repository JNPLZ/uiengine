<template>
  <tbody>
    <tr
      v-for="(prop, themeId, index) in displayedThemes"
      :key="themeId"
    >
      <td
        v-if="index === 0"
        :rowspan="Object.keys(displayedThemes).length"
        class="themeProperty__property uie-rowspan-right"
      >
        <div class="themeProperty__name">
          {{ themeProperty.name }}
        </div>
        <code
          v-if="themeProperty.variable"
          class="themeProperty__variablename"
        >
          {{ themeProperty.variable }}
        </code>
      </td>
      <td
        v-if="displayAllThemes"
        class="themeProperty__theme uie-rowspan-left"
      >
        {{ themeTitle(themeId) }}
      </td>
      <td class="themeProperty__value">
        {{ prop.value }}
      </td>
      <td class="themeProperty__visualization">
        <template v-if="prop.value">
          <span
            v-if="themeProperty.type === 'color'"
            class="themeProperty__swatch"
          >
            <span
              :style="{ backgroundColor: prop.value }"
              class="themeProperty__swatch__inner"
            />
          </span>

          <span
            v-else-if="themeProperty.type === 'size'"
            :style="{ width: prop.value }"
            class="themeProperty__size"
          />
        </template>
      </td>
      <td class="themeProperty__variable">
        <code>{{ prop.variable }}</code>
      </td>
      <td class="themeProperty__default">
        {{ isDefault(prop) }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    themes: {
      type: Array,
      required: true
    },

    themeProperty: {
      type: Object,
      required: true
    },

    currentTheme: {
      type: Object,
      required: true
    },

    displayAllThemes: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    displayedThemes () {
      return this.displayAllThemes
        ? this.themeProperty.themes
        : { [this.currentTheme.id]: this.themeProperty.themes[this.currentTheme.id] }
    }
  },

  methods: {
    themeTitle (themeId) {
      const theme = this.themes.find(theme => theme.id === themeId)
      return theme && theme.title ? theme.title : themeId
    },

    isDefault ({ value, variable }) {
      if (!this.themeProperty.default) return false

      const { value: defaultValue, variable: defaultVariable } = this.themeProperty.default
      const valMatches = (typeof defaultValue !== 'undefined' && defaultValue === value)
      const varMatches = (typeof defaultVariable !== 'undefined' && defaultVariable === variable)

      return valMatches || varMatches ? '*' : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.themeProperty
  &__variablename
    display inline-block
    margin-top var(--uie-space-xs)
    border 1px solid var(--uie-color-code-border)
    font-size var(--uie-font-size-xs)

  &__default
    width 6em
    text-align center

  &__value
    font-family var(--uie-font-family-code)

  &__variable
    code
      font-size var(--uie-font-size-xs)

  &__default
    text-align center

  &__swatch
    display inline-block
    width 2.5rem
    height 2.5rem
    margin-right var(--uie-space-xs)
    border-radius 50%
    border-bottom-right-radius 0 !important
    border 1px solid var(--uie-color-border-medium)
    padding 2px

    &__inner
      display block
      width 100%
      height 100%
      border-radius 50%
      border-bottom-right-radius 0 !important

  &__size
    position relative
    bottom -.15em
    display inline-block
    height 1.2em
    border 1px solid var(--uie-color-accent-medium)
    background-color var(--uie-color-accent-ultralight)

.themeProperty__property,
tbody tr:last-child td
  border-bottom-color var(--uie-color-border-medium)
</style>
